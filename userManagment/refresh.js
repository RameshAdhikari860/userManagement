const code = '4/0AUJR-x7HSENqFl_ktmekt_Wgvg4SQX5SVvQ-sW1NjZrmPRl2GRGNoxzSxqSY08iwNRYZ4Q';

async function getToken() {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);
}

getToken();
