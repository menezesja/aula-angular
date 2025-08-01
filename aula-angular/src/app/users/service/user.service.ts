import { Signal, signal,computed } from "@angular/core";
import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result.model";
import { User } from "../model/user.model";
import { AbstractUserService } from "./abstract-user.service";

export class UserService extends AbstractUserService{
    private _users = signal<User[]>([])
    override users: Signal<User[]> = computed(()=>this._users());
    override refresh(): void {
        throw new Error("Method not implemented.");
    }
    override add(user: Omit<User, "id" | "createdDate">): Observable<OperationResult> {
        throw new Error("Method not implemented.");
    }
    override remove(id: number): Observable<OperationResult> {
        throw new Error("Method not implemented.");
    }
    override update(user: User): Observable<OperationResult> {
        throw new Error("Method not implemented.");
    }
    override search_by_id(id: number): Observable<OperationResult> {
        throw new Error("Method not implemented.");
    }
    override login(query: any): Observable<OperationResult> {
        throw new Error("Method not implemented.");
    }

}