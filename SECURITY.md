# Security policy

## Supported versions

Only the latest release of Hush gets security fixes. Download the newest version from [hush.software](https://www.hush.software/download).

## Reporting a vulnerability

Please do not open a public issue for security problems.

Report it privately through GitHub: go to the [Security tab](https://github.com/DeepanshuPal/hush/security) and choose **Report a vulnerability**. Include what you found, how to reproduce it, and the Hush and macOS versions.

You'll get a reply within a week. Once a fix ships, the report is credited in the release notes unless you'd rather stay anonymous.

## Scope

Hush records audio only while you are dictating, and speech recognition runs on your Mac. Of particular interest:

- anything that sends audio, transcripts or settings off the Mac without the user turning on an AI provider
- model downloads (integrity of what gets installed)
- the Accessibility and microphone permissions Hush holds
