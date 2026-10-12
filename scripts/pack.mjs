import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const artifacts = resolve(root, 'artifacts');
const zip = resolve(artifacts, 'blink-maze-v0.3.zip');
if (!existsSync(resolve(dist, 'index.html'))) throw Error('Run npm run build first.');
if (!readdirSync(dist).includes('assets')) throw Error('Build assets are missing.');
mkdirSync(artifacts, { recursive: true });
const quote = value => "'" + value.replaceAll("'", "''") + "'";
// .NET ZIP avoids the optional PowerShell Archive module and keeps index.html at the root.
execFileSync('powershell.exe', ['-NoProfile', '-Command', `Add-Type -AssemblyName System.IO.Compression.FileSystem; if (Test-Path -LiteralPath ${quote(zip)}) { [System.IO.File]::Delete(${quote(zip)}) }; [System.IO.Compression.ZipFile]::CreateFromDirectory(${quote(dist)}, ${quote(zip)}, [System.IO.Compression.CompressionLevel]::Optimal, $false)`], { stdio: 'inherit' });
console.log(zip);
