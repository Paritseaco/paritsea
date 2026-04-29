INSERT INTO options (name, value)
VALUES (
	'site:tagline',
	'"A public reference framework for structural coherence, legitimacy, and applied judgment."'
)
ON CONFLICT(name) DO UPDATE SET value = excluded.value;
