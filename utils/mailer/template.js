const getHtmlTemplate = (params) => {
    return `DEAR <b> ${params.teamName}</b><br/>
    <p>Thank you for registering to enter the UAEs first amateur padel league, we are super excited to welcome you.</p>
    <br/><p>Please follow us on Instagram @padelleagueuae for updates, and we will be contacting you soon about the league start date & match timings with all your fixtures.</p> <br/>
    <p>In the meantime, we have some information for you to digest related to the league rules in case you are not familiar with them all and further information about the league and how it will operate in terms of league table scoring.</p><br/> 
    SINCERELY,<br/>PADEL LEAGUE UAE TEAM`;
}

module.exports = {
    getHtmlTemplate
}
