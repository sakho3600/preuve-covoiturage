import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoggerService} from "../common/applicativeService/logger/service";

@Injectable()
export class RegistryService {

    constructor(private http: HttpClient, private loggerService: LoggerService) {
        this.loggerService = loggerService;
    }



}