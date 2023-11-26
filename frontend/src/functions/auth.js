import { __awaiter, __generator } from "tslib";
import { getAuthLocalStorage, setAuthLocalStorage } from './localStorage';
export var authLogin = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('https://localhost:5000/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: email, password: password }),
                        credentials: 'include',
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    return [2 /*return*/, false];
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                setAuthLocalStorage(data);
                return [2 /*return*/, true];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, false];
        }
    });
}); };
export var authRegistro = function (_a) {
    var username = _a.username, password = _a.password, email = _a.email;
    return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5000/registro", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: username, password: password, email: email }),
                    })];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _b.sent();
                    return [2 /*return*/, data];
            }
        });
    });
};
export var fetchApi = function (ruta, method) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, response_1, data_1, date, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                auth = getAuthLocalStorage();
                if (!!auth) return [3 /*break*/, 3];
                return [4 /*yield*/, fetch("http://localhost:5000".concat(ruta), {
                        method: method,
                    })];
            case 1:
                response_1 = _a.sent();
                return [4 /*yield*/, response_1.json()];
            case 2:
                data_1 = _a.sent();
                return [2 /*return*/, data_1.data];
            case 3:
                date = new Date(auth.token.expiresOn);
                if (date < new Date())
                    throw new Error('Token expirado');
                return [4 /*yield*/, fetch("http://localhost:5000".concat(ruta), {
                        method: method,
                        headers: {
                            Authorization: "Bearer ".concat(auth.token.token),
                        },
                    })];
            case 4:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 5:
                data = _a.sent();
                return [2 /*return*/, data.data];
        }
    });
}); };
//# sourceMappingURL=auth.js.map