
Get Request: https://pkce-generator.onrender.com/generate-pkce

The response will be like the following: <br/>{<br/>
  "codeVerifier": "93f3c1504a1f31c6a780679a81299bac7b3fb0fe4a8a91fcfb3cdb3e",<br/>
  "codeChallenge": "tdE6bLk2rgG053xdK_1d_ZC964pyU4JOhhU-od-PID0"<br/>
}

You can use hash codeVerifier with sha256 to verify codeChallenge.
