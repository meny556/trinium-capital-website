#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Web3Forms Access Key Deployment Script');
console.log('==========================================\n');

// Check if access key is provided as command line argument
const accessKey = process.argv[2];

if (!accessKey) {
    console.log('❌ Error: No Web3Forms access key provided!');
    console.log('\n📋 Usage:');
    console.log('   node deploy-web3forms.js YOUR_ACCESS_KEY_HERE');
    console.log('\n🔑 To get your Web3Forms access key:');
    console.log('   1. Go to https://web3forms.com/');
    console.log('   2. Sign up or log in');
    console.log('   3. Create a new form or use existing one');
    console.log('   4. Copy your access key');
    console.log('\n💡 Example:');
    console.log('   node deploy-web3forms.js 12345678-1234-1234-1234-123456789012');
    process.exit(1);
}

// Validate access key format (basic check)
if (!/^[a-zA-Z0-9-]+$/.test(accessKey)) {
    console.log('❌ Error: Invalid access key format!');
    console.log('   Access key should contain only letters, numbers, and hyphens.');
    process.exit(1);
}

const htmlFile = path.join(__dirname, 'index.html');

// Check if index.html exists
if (!fs.existsSync(htmlFile)) {
    console.log('❌ Error: index.html not found in current directory!');
    process.exit(1);
}

try {
    // Read the HTML file
    let htmlContent = fs.readFileSync(htmlFile, 'utf8');
    
    // Check if placeholder exists
    if (!htmlContent.includes('YOUR_WEB3FORMS_ACCESS_KEY')) {
        console.log('❌ Error: Web3Forms access key placeholder not found in index.html!');
        console.log('   Make sure the file contains: value="YOUR_WEB3FORMS_ACCESS_KEY"');
        process.exit(1);
    }
    
    // Replace the placeholder with actual access key
    const updatedContent = htmlContent.replace(
        'value="YOUR_WEB3FORMS_ACCESS_KEY"',
        `value="${accessKey}"`
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(htmlFile, updatedContent, 'utf8');
    
    console.log('✅ Success! Web3Forms access key has been deployed.');
    console.log(`🔑 Access Key: ${accessKey}`);
    console.log('\n📁 Files updated:');
    console.log('   - index.html');
    console.log('\n🚀 Next steps:');
    console.log('   1. Upload all files to your hosting provider');
    console.log('   2. Test the contact form on your live website');
    console.log('   3. Check your Web3Forms dashboard for submissions');
    console.log('\n📧 Test your form by:');
    console.log('   1. Going to your live website');
    console.log('   2. Filling out the contact form');
    console.log('   3. Submitting the form');
    console.log('   4. Checking your email for the submission');
    
} catch (error) {
    console.log('❌ Error updating file:', error.message);
    process.exit(1);
} 