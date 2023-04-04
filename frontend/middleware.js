import { NextResponse } from "next/dist/server/web/spec-extension/response";


const middleware = (req) => {
   
    const url = req.url
    const verfied =  req.cookies.get('accessToken') ? req.cookies.get('accessToken') : undefined;
    const host = "http://localhost:3000"
 
    if (verfied === undefined && (
        url.includes('/dashboard') 
        ||
        url.includes('/profile')
        || 
        url.includes('/jobs')
        ||
        url.includes('/OpportunityList')
        ||
        url.includes('/AllOpportunities')
        ||
        url.includes('/regularUsers')
        || 
        url.includes('/opportunityCreationForm')
        || 
        url.includes('/ActivityCreation')
        ||
        url.includes('/scholarshipCreationForm')
        ||
        url.includes('/Activityapplication')
        ||
        url.includes('/jobApplication')
        ||
        url.includes('/scholarshipEdit')
        ||
        url.includes('/OpportunityEdit')
        ||
        url.includes('/opportunities')
    )) {
        return NextResponse.redirect(host+"/login")
    }

    return NextResponse.next()
}

export default middleware;