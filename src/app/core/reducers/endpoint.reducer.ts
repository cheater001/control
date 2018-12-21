import {
  EndpointActions
} from '@core/actions';

export interface State {
  endpoint: string | null;
}

const initialState: State = {
  endpoint: null,
};

export function reducer(
  state: State = initialState,
  action: EndpointActions.EndpointActionsUnion
): State {
  switch ( action.type ) {
    case EndpointActions.EndpointActionTypes.Restore:
    case EndpointActions.EndpointActionTypes.Set:
      return {
        endpoint: action.payload,
      };

    default:
      return state;
  }
}

export const getEndpoint = (state: State) => state.endpoint;
