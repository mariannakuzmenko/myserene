"""Browser regression checks for ocean playback and independent failure imagery.
Run: python3 tests/test_hero_video.py
"""
import asyncio
from playwright.async_api import async_playwright

async def check(browser, label, viewport, failure=None):
    context = await browser.new_context(viewport=viewport)
    page = await context.new_page()
    if failure == 'network':
        await page.route('**/__l5e/assets-v1/**', lambda route: route.abort())
    elif failure == 'autoplay':
        await page.add_init_script("HTMLMediaElement.prototype.play = function() { return Promise.reject(new DOMException('blocked', 'NotAllowedError')); };")
    elif failure == 'corrupt':
        await page.route('**/hero-premium.mp4', lambda route: route.fulfill(status=200, content_type='video/mp4', body='not a video'))
        await page.route('**/hero-premium.webm', lambda route: route.fulfill(status=200, content_type='video/webm', body='not a video'))
    await page.goto('http://localhost:8080', wait_until='domcontentloaded')
    hero = page.locator('section').first
    await hero.locator('img').first.wait_for()
    await page.wait_for_function("document.querySelector('section img').naturalWidth > 0")
    await page.wait_for_timeout(6000)
    if failure:
        assert await hero.locator('img').first.evaluate('(i)=>i.naturalWidth >= 1280 && i.complete')
        video = hero.locator('video')
        assert await video.count() == 0 or await video.evaluate('(v)=>getComputedStyle(v).visibility === "hidden"')
    else:
        video = hero.locator('video')
        await page.wait_for_function("document.querySelector('video')?.currentTime > 0.5")
        first = await video.evaluate('(v)=>v.currentTime')
        await page.wait_for_timeout(1000)
        state = await video.evaluate('(v)=>({time:v.currentTime,paused:v.paused,width:v.videoWidth,muted:v.muted,inline:v.playsInline,loop:v.loop,autoplay:v.autoplay,visible:getComputedStyle(v).visibility})')
        assert state['time'] != first and state['width'] >= 1280 and not state['paused'], state
        assert state['muted'] and state['inline'] and state['loop'] and state['autoplay'], state
        assert state['visible'] == 'visible', state
        # Seek near the end and verify native looping rather than an ended frame.
        await video.evaluate('(v)=>{v.currentTime=v.duration-0.25}')
        await page.wait_for_timeout(1000)
        assert await video.evaluate('(v)=>!v.ended && !v.paused && v.currentTime < 3')
        print(label, state)
    bounds = await hero.evaluate('(s)=>({x:s.getBoundingClientRect().x,width:s.getBoundingClientRect().width,scroll:document.documentElement.scrollWidth})')
    assert bounds['x'] == 0 and bounds['width'] == viewport['width'] and bounds['scroll'] == viewport['width'], bounds
    await page.screenshot(path=f'/tmp/browser/ocean-fix/screenshots/{label}.png')
    print('PASS', label)
    await context.close()

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        await check(browser, 'desktop-playback', {'width':1280,'height':1800})
        await check(browser, 'android-sized-playback', {'width':393,'height':852})
        for failure in ['network','autoplay','corrupt']:
            await check(browser, failure+'-fallback', {'width':390,'height':844}, failure)
        await browser.close()
        try:
            safari = await p.webkit.launch(headless=True)
        except Exception as error:
            print('WEBKIT UNAVAILABLE', str(error).splitlines()[0])
        else:
            await check(safari, 'webkit-iphone-sized-playback', {'width':390,'height':844})
            await safari.close()

asyncio.run(main())
