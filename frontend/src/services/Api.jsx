import axios from 'axios';

const apiUrl = 'https://spottedcaaso-api.onrender.com'

const api = axios.create({
    baseURL: apiUrl+'/api/v1'
});

async function getFeed(){
    const response = await api.get('/protected/feed')
    return response
}

async function postSpotted({text}){
    const response = await api.post('/protected/spotted', {text})
    return response
}

async function postAnonymousSpotted({text}){
    const response = await api.post('/unprotected/spotted', {text}) 
    return response
}

async function postProtectedSpottedComment({spottedId, text}){
    const response = await api.post('/protected/spotted/'+String(spottedId)+'/comment', {text}) 
    return response
}

async function postProtectedSpottedVote({spottedId, text}){
    const response = await api.post('/protected/spotted/'+String(spottedId)+'/vote') 
    return response
}

async function postProtectedSpottedReport({spottedId, text}){
    const response = await api.post('/protected/spotted/'+String(spottedId)+'/report', {text}) 
    return response
}

async function registerUser({email, name, username, password}){
    const response = await api.post('/auth/register', {email, name, username, password, password_confirmation: password })
}

export {
  api,
  getFeed,
  postAnonymousSpotted,
  postProtectedSpottedComment,
  postProtectedSpottedReport,
  postProtectedSpottedVote,
  postSpotted,
  registerUser,
};
