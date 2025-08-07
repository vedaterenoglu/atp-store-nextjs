#!/usr/bin/env node

/**
 * Node script to run GraphQL codegen via shell script
 * This wrapper executes the local run-codegen.sh script that contains secrets
 */

import { exec } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const scriptPath = path.join(__dirname, '..', 'run-codegen.sh')

// Starting GraphQL Codegen

exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Codegen failed:', error.message)
    process.exit(1)
  }

  if (stderr) {
    console.error('⚠️ Warnings:', stderr)
  }

  // Output captured but not logged
  if (stdout) {
    // Success output available
  }
})
