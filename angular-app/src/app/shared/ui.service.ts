import { Subject } from 'rxjs';

export class UIService {
    loading = new Subject<boolean>();
}