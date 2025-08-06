#!/usr/bin/env node

/**
 * Node script to run GraphQL codegen via shell script
 * This wrapper executes the local run-codegen.sh script that contains secrets
 */

const { exec } = require('child_process')
const path = require('path')

const scriptPath = path.join(__dirname, '..', 'run-codegen.sh')

console.log('🚀 Starting GraphQL Codegen...')

exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Codegen failed:', error.message)
    process.exit(1)
  }
  
  if (stderr) {
    console.error('⚠️ Warnings:', stderr)
  }
  
  console.log(stdout)
  console.log('✅ Codegen completed successfully!')
})