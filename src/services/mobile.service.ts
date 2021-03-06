import { Injectable } from '@angular/core'
import { MobileAppsModel } from '../models'
import {Subject, BehaviorSubject, Observable, ReplaySubject} from 'rxjs'
import { ResourceService } from './resources'
import { Response } from '@angular/http'

@Injectable()
export class MobileService {
	mobileInitialState: MobileAppsModel = new MobileAppsModel()
	mobileAppsSubject: Subject<MobileAppsModel> = new ReplaySubject<MobileAppsModel>(1)
	constructor(public rs: ResourceService) {
		this.getMobileApps()
	}

	getMobileApps(): void {
		this.rs.getApps()
			.subscribe((res: Response) => {
				this.mobileAppsSubject.next(res.json().data)
			}, (err: Response) => {
				this.mobileAppsSubject.next(this.mobileInitialState)
			})
	}
}