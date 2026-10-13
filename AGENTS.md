<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The homepage ocean background imports CDN asset pointers resolved against the published Lovable asset origin, with MP4 first and an independent bundled ocean image behind playback-gated video; this keeps exported Netlify sites and failed or blocked playback from showing an empty background.
