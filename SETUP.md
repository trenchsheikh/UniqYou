# UniqYou Setup Guide

## Environment Variables Configuration

### 1. Create Environment File

Create a `.env` file in the project root directory:

```bash
# In your project root (ruokay/ruokay/)
touch .env
```

### 2. Add Your API Key

Edit the `.env` file and add your Google Gemini API key:

```bash
# Google Gemini API Configuration
VITE_GEMINI_API_KEY=AIzaSyDQsznRTwNkICCnlWRLWbYNf5g_VkhxlGY
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
```

### 3. Get Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key (starts with "AIza")
5. Paste it in your `.env` file

### 4. Restart Development Server

After creating the `.env` file, restart your development server:

```bash
npm run dev
```

## Security Notes

- ✅ **DO**: Keep your `.env` file private
- ✅ **DO**: Add `.env` to `.gitignore` (already done)
- ✅ **DO**: Use different keys for development and production
- ❌ **DON'T**: Commit your `.env` file to version control
- ❌ **DON'T**: Share your API key publicly
- ❌ **DON'T**: Use the same key across multiple projects

## Fallback Mode

If no API key is provided or if the API is unavailable, the app will:
- Show a warning in the console
- Use intelligent fallback responses
- Maintain all functionality with offline AI responses
- Provide helpful guidance and strategies

## Troubleshooting

### API Key Not Working?
1. Check that your `.env` file is in the project root
2. Verify the API key starts with "AIza"
3. Restart the development server
4. Check browser console for error messages

### Still Having Issues?
1. Verify your API key is valid at Google AI Studio
2. Check your internet connection
3. Ensure the API key has proper permissions
4. Try the fallback mode for testing

## Support

If you continue to have issues:
- Check the browser console for error messages
- Verify your API key format and permissions
- Try running without an API key to test fallback mode
