# Threat Modeling & Security Posture

- **Token Rotation**: Short-lived access tokens (15m) paired with refresh token rotation and Redis revocation lists.
- **Brute Force Mitigation**: Tiered IP and account rate limiting via `express-rate-limit`.
- **MFA Architecture**: RFC 6238 TOTP algorithm with SHA-1/SHA-256 authenticator app integration.
