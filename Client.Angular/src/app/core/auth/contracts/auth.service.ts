import { Observable } from "rxjs";
import { RegistrationRequest } from "../../../auth/models/registration";

export interface IAuthService {
    register(req: RegistrationRequest): Observable<void>;

}