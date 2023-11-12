#!/usr/bin/env -S deno run -A --watch=styles/,routes/

import dev from '$fresh/dev.ts';
import config from './fresh.config.ts';

import '$std/dotenv/load.ts';

import sass from 'https://deno.land/x/denosass@1.0.6/mod.ts';

const compile = sass(['./styles/style.scss']);
const str = compile.to_string();
const data = `/* DO NOT EDIT. This file is generated. */\n${
  (str instanceof Map) && str.get('style')
}`;
Deno.writeTextFileSync('./static/style.min.css', data);

await dev(import.meta.url, './main.ts', config);
