import {observable, action, computed, decorate} from 'mobx';

import fakeData from '../data/sampleData';
import axios from "axios";
import CustomError from "../utils/CustomError";

class User {

    constructor(user) {
        this.id = user.id ;
        this.name = user.name;
        this.avatar = user.avatar;
        this.token = user.token;
    }
}

/**
 * Gerencia autenticação do usuário
 */
class AuthStore {

    user;
    isLogged;

    constructor() {

        // Check localStorage persistence
        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.isLogged = localStorage.getItem('isLogged');
        }

    }

    /**
     * Do user login and change this.user
     * @param data
     * @return {Promise.<void>}
     */
    doFakeLogin() {

        let dummyId = Math.floor(Math.random() * 2) + 1;

        let id = encodeURIComponent(dummyId);
        console.log('Accessing mock api via GET');
        console.log('Looking for user with ID: ' + dummyId);

        axios.get('/api/v1/dummies/user/' + id)
            .then((response) => {
                if (!response.data) {
                    throw new Error('No data response');
                } else if (response.data.error) {
                    throw new CustomError(response.data.error);
                }
                return response;
            })
            .then((response) => {

                console.log('mocked data recovery');
                console.log(response);

                this.user = new User(response.data);
                this.isLogged = true;

                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('isLogged', true);

            }).catch(function (error) {
                // handle error
                console.log('mocked failed');
                console.log(error);
                if (error instanceof CustomError) {
                    console.log('Code: ' + error.code);
                    console.log('Tag: ' + error.tag);
                }
            });

    }

    /**
     * Do user login and change this.user
     * @param data
     * @return {Promise.<void>}
     */
    getInfo(data) {

        let dummyUser = {};

        if (data.id) {
            dummyUser = fakeData.users.find(x => x.id === data.id)
        } else {
            dummyUser = fakeData.users.find(x => x.name === (data.name || data))
        }

        return dummyUser;

    }

    /**
     * Do logout and clean Persistence in localStorage
     */
    doLogout() {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('user');
        this.user = null;
        this.isLogged = false;
    }

    /**
     * Check if user is logged
     * @return {*}
     */
    get checkAuth() {
        return this.isLogged;
    }


}

decorate(AuthStore, {
    user : observable,
    isLogged : observable,
    doLogin : action,
    doLogout : action,
    getInfo : action,
    checkAuth : computed
});

export default new AuthStore();
