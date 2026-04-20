import type { AstroInstance } from 'astro';
import { Github, Instagram } from 'lucide-astro';

export interface SocialLink {
	name: string;
	url: string;
	icon: AstroInstance;
}

export default {
	title: 'Dimi Shoots',
	favicon: 'favicon.ico',
	owner: 'Dimi Shoots',
	profileImage: 'profile.webp',
	socialLinks: [

		{
			name: 'Instagram',
			url: 'https://www.instagram.com/dimi.shoots',
			icon: Instagram,
		} as SocialLink,
	],
};
