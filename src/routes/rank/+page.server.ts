// src/routes/rank/+page.server.ts
import type { ServerLoad } from '@sveltejs/kit';
import { getTopPlayers } from '$lib/server/db/stats.js';

export const load: ServerLoad = async () => {
  const ranking = await getTopPlayers(10);
  return { ranking };
};
