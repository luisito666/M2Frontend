import { createAction, props } from '@ngrx/store';

// interface
import { Message } from '@metin2/api';


export const LoadMessages = createAction(
    '[WS] Load Messages',
    props<{messages: Message[]}>()
);


export const AddMessage = createAction(
    '[WS] Add Message',
    props<{message: Message}>()
);
