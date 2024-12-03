function doPost(e) {
    const spreadsheetId = '16EQvdobAoD3lBFLxaRLck8CBSHNo1NZsOTDydGWOchE'; // Replace with your sheet's ID
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    const today = new Date();
    const thisMonth = `${today.getFullYear()}-${today.getMonth() + 1}`;

    // Check if the voter has already voted this month
    const votes = sheet.getDataRange().getValues();
    const hasVoted = votes.some(row => row[1] === data.voterEmail && row[2].startsWith(thisMonth));

    if (hasVoted) {
        return ContentService
            .createTextOutput('You have already voted this month.')
            .setMimeType(ContentService.MimeType.TEXT);
    }

    // Append the vote
    sheet.appendRow([data.employeeName, data.voterEmail, new Date()]);

    return ContentService
        .createTextOutput('Thank you! Your vote has been recorded.')
        .setMimeType(ContentService.MimeType.TEXT);
}