const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"]);

export function getYouTubeEmbedUrl(value: string | null | undefined): string | null {
	if (!value) return null;

	try {
		const url = new URL(value);
		if (!YOUTUBE_HOSTS.has(url.hostname.toLowerCase())) return null;

		let videoId = "";
		if (url.hostname.toLowerCase() === "youtu.be") {
			videoId = url.pathname.split("/").filter(Boolean)[0] ?? "";
		} else if (url.pathname === "/watch") {
			videoId = url.searchParams.get("v") ?? "";
		} else {
			const parts = url.pathname.split("/").filter(Boolean);
			if (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") {
				videoId = parts[1] ?? "";
			}
		}

		if (!/^[A-Za-z0-9_-]{6,}$/.test(videoId)) return null;
		return `https://www.youtube-nocookie.com/embed/${videoId}`;
	} catch {
		return null;
	}
}
