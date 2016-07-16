/// <reference path="../jsrsasign/index.d.ts" />

declare module Oidc {
    export class Log {
        static NONE: number;
        static ERROR: number;
        static WARN: number;
        static INFO: number;
        static reset(): void;
        static level: any;
        static logger: any;
        static info(...args: any[]): void;
        static warn(...args: any[]): void;
        static error(...args: any[]): void;
    }
    export class Global {
        static _testing(): void;
        static location: Location;
        static localStorage: Storage;
        static sessionStorage: Storage;
        static XMLHttpRequest: {
            new (): XMLHttpRequest;
            prototype: XMLHttpRequest;
            DONE: number;
            HEADERS_RECEIVED: number;
            LOADING: number;
            OPENED: number;
            UNSENT: number;
            create(): XMLHttpRequest;
        };
        static timer: {
            setTimeout: (cb: any, duration: any) => number;
            clearTimeout: (handle: any) => void;
        };
    }
    export class Event {
        _name: any;
        _callbacks: any;
        constructor(name: any);
        addHandler(cb: any): void;
        removeHandler(cb: any): void;
        raise(...params: any[]): void;
    }
    export class Timer extends Event {
        _timer: any;
        _timerHandle: any;
        constructor(name: any, timer?: {
            setTimeout: (cb: any, duration: any) => number;
            clearTimeout: (handle: any) => void;
        });
        init(duration: any): void;
        cancel(): void;
        _callback(): void;
    }
    export class AccessTokenEvents {
        _accessTokenExpiringNotificationTime: number;
        _accessTokenExpiring: Timer;
        _accessTokenExpired: Timer;
        constructor({accessTokenExpiringNotificationTime, accessTokenExpiringTimer, accessTokenExpiredTimer}?: {
            accessTokenExpiringNotificationTime?: number;
            accessTokenExpiringTimer?: Timer;
            accessTokenExpiredTimer?: Timer;
        });
        load(container: any): void;
        unload(): void;
        _cancelTimers(): void;
        addAccessTokenExpiring(cb: any): void;
        removeAccessTokenExpiring(cb: any): void;
        addAccessTokenExpired(cb: any): void;
        removeAccessTokenExpired(cb: any): void;
    }
    export class ErrorResponse extends Error {
        error: any;
        error_description: any;
        error_uri: any;
        state: any;
        constructor({error, error_description, error_uri, state}: {
            error: any;
            error_description: any;
            error_uri: any;
            state: any;
        });
    }
    export class IFrameWindow {
        _promise: Promise<any>;
        _resolve: any;
        _reject: any;
        _boundMessageEvent: any;
        _boundMessageEventssage: any;
        _frame: any;
        _timer: number;
        constructor();
        navigate(params: any): Promise<any>;
        promise: Promise<any>;
        _success(data: any): void;
        _error(message: any): void;
        _cleanup(): void;
        _timeout(): void;
        _message(e: any): void;
        _origin: string;
        static notifyParent(url: any): void;
    }
    export class IFrameNavigator {
        prepare(): Promise<IFrameWindow>;
        callback(url: any): Promise<void>;
    }
    export class InMemoryWebStorage {
        _data: any;
        constructor();
        getItem(key: any): any;
        setItem(key: any, value: any): void;
        removeItem(key: any): void;
        length: number;
        key(index: any): string;
    }
    export class JoseUtil {
        parseJwt(jwt: any): {
            header: any;
            payload: any;
        };
        validateJwt(jwt: any, key: any, issuer: any, audience: any, clockSkew: any, now?: any): Promise<void>;
        _validateJwt(jwt: any, key: any, issuer: any, audience: any, clockSkew: any, now: any): Promise<void>;
        hashString(value: any, alg: any): any;
        hexToBase64Url(value: any): any;
    }
    export class JsonService {
        _XMLHttpRequest: any;
        constructor(XMLHttpRequestCtor?: {
            new (): XMLHttpRequest;
            prototype: XMLHttpRequest;
            DONE: number;
            HEADERS_RECEIVED: number;
            LOADING: number;
            OPENED: number;
            UNSENT: number;
            create(): XMLHttpRequest;
        });
        getJson(url: any, token: any): Promise<{}>;
    }
    export class MetadataService {
        _settings: any;
        _jsonService: any;
        constructor(settings: any, JsonServiceCtor?: typeof JsonService);
        getMetadata(): any;
        getIssuer(): any;
        getAuthorizationEndpoint(): any;
        getUserInfoEndpoint(): any;
        getCheckSessionIframe(): any;
        getEndSessionEndpoint(): any;
        _getMetadataProperty(name: any): any;
        getSigningKeys(): any;
        _filterSigningKeys(keys: any): any;
    }
    export class WebStorageStateStore {
        _store: any;
        _prefix: any;
        constructor({prefix, store}?: {
            prefix?: string;
            store?: Storage;
        });
        set(key: any, value: any): Promise<void>;
        get(key: any): Promise<any>;
        remove(key: any): Promise<any>;
        getAllKeys(): Promise<any[]>;
    }
    export class UserInfoService {
        _settings: any;
        _jsonService: JsonService;
        _metadataService: MetadataService;
        constructor(settings: any, JsonServiceCtor?: typeof JsonService, MetadataServiceCtor?: typeof MetadataService);
        getClaims(token: any): any;
    }
    export class ResponseValidator {
        _settings: any;
        _metadataService: MetadataService;
        _userInfoService: UserInfoService;
        _joseUtil: JoseUtil;
        constructor(settings: any, MetadataServiceCtor?: typeof MetadataService, UserInfoServiceCtor?: typeof UserInfoService, joseUtil?: JoseUtil);
        validateSigninResponse(state: any, response: any): Promise<any>;
        validateSignoutResponse(state: any, response: any): Promise<void>;
        _processSigninParams(state: any, response: any): Promise<void>;
        _processClaims(response: any): any;
        _mergeClaims(claims1: any, claims2: any): any;
        _filterProtocolClaims(claims: any): any;
        _validateTokens(state: any, response: any): any;
        _validateIdTokenAndAccessToken(state: any, response: any): any;
        _validateIdToken(state: any, response: any): any;
        _validateAccessToken(response: any): Promise<void>;
    }
    export class OidcClientSettings {
        _authority: any;
        _metadataUrl: any;
        _metadata: any;
        _signingKeys: any;
        _client_id: any;
        _response_type: any;
        _scope: any;
        _redirect_uri: any;
        _post_logout_redirect_uri: any;
        _prompt: any;
        _display: any;
        _max_age: any;
        _ui_locales: any;
        _acr_values: any;
        _filterProtocolClaims: any;
        _loadUserInfo: any;
        _staleStateAge: any;
        _clockSkew: any;
        _stateStore: any;
        _validator: any;
        _metadataService: any;
        constructor({authority, metadataUrl, metadata, signingKeys, client_id, response_type, scope, redirect_uri, post_logout_redirect_uri, prompt, display, max_age, ui_locales, acr_values, filterProtocolClaims, loadUserInfo, staleStateAge, clockSkew, stateStore, ResponseValidatorCtor, MetadataServiceCtor}: {
            authority: any;
            metadataUrl: any;
            metadata: any;
            signingKeys: any;
            client_id: any;
            response_type?: string;
            scope?: string;
            redirect_uri: any;
            post_logout_redirect_uri: any;
            prompt: any;
            display: any;
            max_age: any;
            ui_locales: any;
            acr_values: any;
            filterProtocolClaims?: boolean;
            loadUserInfo?: boolean;
            staleStateAge?: number;
            clockSkew?: number;
            stateStore?: WebStorageStateStore;
            ResponseValidatorCtor?: typeof ResponseValidator;
            MetadataServiceCtor?: typeof MetadataService;
        });
        client_id: any;
        response_type: any;
        scope: any;
        redirect_uri: any;
        post_logout_redirect_uri: any;
        prompt: any;
        display: any;
        max_age: any;
        ui_locales: any;
        acr_values: any;
        authority: any;
        metadataUrl: any;
        metadata: any;
        signingKeys: any;
        filterProtocolClaims: any;
        loadUserInfo: any;
        staleStateAge: any;
        clockSkew: any;
        stateStore: any;
        validator: any;
        metadataService: any;
    }
    export class UrlUtility {
        static addQueryParam(url: any, name: any, value: any): any;
        static parseUrlFragment(value: any, delimiter?: string, global?: typeof Global): any;
    }
    export default function random(): string;
    export class State {
        _id: any;
        _data: any;
        _created: any;
        constructor({id, data, created}: {
            id: any;
            data: any;
            created: any;
        });
        id: any;
        data: any;
        created: any;
        toStorageString(): string;
        static fromStorageString(storageString: any): State;
        static clearStaleState(storage: any, age: any): any;
    }
    export class SigninState extends State {
        _nonce: string;
        _authority: any;
        _client_id: any;
        constructor({nonce, authority, client_id}: {
            nonce: any;
            authority: any;
            client_id: any;
        }, data?: any);
        nonce: string;
        authority: any;
        client_id: any;
        toStorageString(): string;
        static fromStorageString(storageString: any): SigninState;
    }
    export class SigninRequest {
        state: SigninState;
        url: any;
        constructor({url, client_id, redirect_uri, response_type, scope, authority, data, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values}: {
            url: any;
            client_id: any;
            redirect_uri: any;
            response_type: any;
            scope: any;
            authority: any;
            data: any;
            prompt: any;
            display: any;
            max_age: any;
            ui_locales: any;
            id_token_hint: any;
            login_hint: any;
            acr_values: any;
        });
        static isOidc(response_type: any): boolean;
        static isOAuth(response_type: any): boolean;
    }
    export class SigninResponse {
        error: any;
        error_description: any;
        error_uri: any;
        state: any;
        id_token: any;
        session_state: any;
        access_token: any;
        token_type: any;
        scope: any;
        profile: any;
        expires_at: any;
        constructor(url: any);
        expires_in: number;
        expired: boolean;
        scopes: any;
        isOpenIdConnect: boolean;
    }
    export class SignoutRequest {
        state: any;
        url: any;
        constructor({url, id_token_hint, post_logout_redirect_uri, data}: {
            url: any;
            id_token_hint: any;
            post_logout_redirect_uri: any;
            data: any;
        });
    }
    export class SignoutResponse {
        error: any;
        error_description: any;
        error_uri: any;
        state: any;
        constructor(url: any);
    }
    export class OidcClient {
        _settings: any;
        constructor(settings?: any);
        _stateStore: any;
        _validator: any;
        _metadataService: any;
        settings: any;
        metadataService: any;
        createSigninRequest({response_type, scope, redirect_uri, data, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values}: {
            response_type: any;
            scope: any;
            redirect_uri: any;
            data: any;
            prompt: any;
            display: any;
            max_age: any;
            ui_locales: any;
            id_token_hint: any;
            login_hint: any;
            acr_values: any;
        }, stateStore?: any): any;
        processSigninResponse(url: any, stateStore?: any): any;
        createSignoutRequest({id_token_hint, data, post_logout_redirect_uri}: {
            id_token_hint: any;
            data: any;
            post_logout_redirect_uri: any;
        }, stateStore?: any): any;
        processSignoutResponse(url: any, stateStore?: any): any;
        clearStaleState(stateStore: any): any;
    }
    export class PopupWindow {
        _promise: Promise<any>;
        _resolve: any;
        _reject: any;
        _boundMessageEventssage: any;
        _boundMessageEvent: any;
        _popup: Window;
        _checkForPopupClosedTimer: number;
        constructor(params: any);
        navigate(params: any): Promise<any>;
        promise: Promise<any>;
        _success(data: any): void;
        _error(message: any): void;
        _cleanup(): void;
        _checkForPopupClosed(): void;
        _message(e: any): void;
        _origin: string;
        static notifyOpener(url: any): void;
    }
    export class PopupNavigator {
        prepare(params: any): Promise<PopupWindow>;
        callback(url: any): Promise<void>;
    }
    export class RedirectNavigator {
        prepare(): Promise<this>;
        navigate(params: any): Promise<void>;
        url: string;
    }
    export class SilentRenewService {
        _userManager: any;
        constructor(userManager: any);
        _tokenExpiring(): void;
    }
    export class User {
        id_token: any;
        session_state: any;
        access_token: any;
        token_type: any;
        scope: any;
        profile: any;
        expires_at: any;
        state: any;
        constructor({id_token, session_state, access_token, token_type, scope, profile, expires_at, state}: {
            id_token: any;
            session_state: any;
            access_token: any;
            token_type: any;
            scope: any;
            profile: any;
            expires_at: any;
            state: any;
        });
        expires_in: number;
        expired: boolean;
        scopes: any;
        toStorageString(): string;
        static fromStorageString(storageString: any): User;
    }
    export class UserManagerSettings extends OidcClientSettings {
        _popup_redirect_uri: any;
        _popupWindowFeatures: any;
        _popupWindowTarget: any;
        _silent_redirect_uri: any;
        _automaticSilentRenew: any;
        _accessTokenExpiringNotificationTime: any;
        _redirectNavigator: any;
        _popupNavigator: any;
        _iframeNavigator: any;
        _userStore: any;
        constructor({popup_redirect_uri, popupWindowFeatures, popupWindowTarget, silent_redirect_uri, automaticSilentRenew, accessTokenExpiringNotificationTime, redirectNavigator, popupNavigator, iframeNavigator, userStore}: {
            popup_redirect_uri: any;
            popupWindowFeatures: any;
            popupWindowTarget: any;
            silent_redirect_uri: any;
            automaticSilentRenew?: boolean;
            accessTokenExpiringNotificationTime?: number;
            redirectNavigator?: RedirectNavigator;
            popupNavigator?: PopupNavigator;
            iframeNavigator?: IFrameNavigator;
            userStore?: WebStorageStateStore;
        });
        popup_redirect_uri: any;
        popupWindowFeatures: any;
        popupWindowTarget: any;
        silent_redirect_uri: any;
        automaticSilentRenew: boolean;
        accessTokenExpiringNotificationTime: any;
        redirectNavigator: any;
        popupNavigator: any;
        iframeNavigator: any;
        userStore: any;
    }
    export class UserManagerEvents extends AccessTokenEvents {
        _userLoaded: Event;
        _userUnloaded: Event;
        _silentRenewError: Event;
        constructor(settings: any);
        load(user: any): void;
        unload(): void;
        addUserLoaded(cb: any): void;
        removeUserLoaded(cb: any): void;
        addUserUnloaded(cb: any): void;
        removeUserUnloaded(cb: any): void;
        addSilentRenewError(cb: any): void;
        removeSilentRenewError(cb: any): void;
        _raiseSilentRenewError(e: any): void;
    }
    export class UserManager extends OidcClient {
        _events: UserManagerEvents;
        _silentRenewService: SilentRenewService;
        constructor(settings?: any);
        _redirectNavigator: any;
        _popupNavigator: any;
        _iframeNavigator: any;
        _userStore: any;
        events: UserManagerEvents;
        getUser(): any;
        removeUser(): any;
        signinPopup(args?: any): any;
        signinPopupCallback(url: any): any;
        signinSilent(args?: any): any;
        signinSilentCallback(url: any): any;
        _signin(args: any, navigator: any, navigatorParams?: {}): any;
        _signinCallback(url: any, navigator: any): any;
        _signout(args: any, navigator: any, navigatorParams?: {}): any;
        _signoutCallback(url: any, navigator: any): any;
        signinRedirect(args: any): any;
        signinRedirectCallback(url: any): any;
        signoutRedirect(args: any): any;
        signoutRedirectCallback(url: any): any;
        _signinStart(args: any, navigator: any, navigatorParams?: any): any;
        _signinEnd(url: any): any;
        _signoutStart(args: any, navigator: any, navigatorParams?: any): any;
        _signoutEnd(url: any): any;
        _userStoreKey: string;
        _loadUser(): any;
        _storeUser(user: any): any;
    }
}
