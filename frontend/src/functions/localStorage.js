import { __awaiter, __generator } from "tslib";
export var setAuthLocalStorage = function (res) {
    console.log('🚀 ~ file: localstorage.ts:13 ~ setAuthLocalStorage ~ res:', res);
    localStorage.setItem('auth', JSON.stringify({
        token: res.token,
        usuario: res.usuario,
    }));
};
//para validar la sesión
export var getAuthLocalStorage = function () {
    var auth = localStorage.getItem('auth');
    if (auth)
        return JSON.parse(auth);
};
//para el log off (creo)
export var removeAuthLocalStorage = function () {
    console.log('removing');
    localStorage.removeItem('auth');
    console.log(localStorage.getItem('auth'));
};
export var validateAuthToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var auth, date;
    return __generator(this, function (_a) {
        auth = getAuthLocalStorage();
        if (!auth)
            return [2 /*return*/, undefined];
        date = new Date(auth.token.expiresOn);
        if (date < new Date())
            return [2 /*return*/, undefined];
        return [2 /*return*/, {
                token: auth.token.token,
                usuario: auth.usuario,
            }];
    });
}); };
//# sourceMappingURL=localStorage.js.map