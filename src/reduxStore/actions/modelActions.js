import {
  REMOVE_INSTANCE,
  SAVE_INSTANCE,
  UPDATE_INSTANCE,
  SAVE_INSTANCE_ARRAY,
  UPDATE_INSTANCE_FROM_ARRAY,
  REMOVE_INSTANCE_FROM_ARRAY,
} from './actionConstant';
import {store} from '../store';

export function dispatch(action) {
  if (action.type) {
    return store.dispatch(action);
  }
  return store.dispatch(action);
}

export function saveInstance(instance, key) {
  return dispatch({
    type: SAVE_INSTANCE,
    instance,
    key,
  });
}

export function removeInstance(key) {
  return dispatch({
    type: REMOVE_INSTANCE,
    key,
  });
}

export function updateInstance(key, instance) {
  return dispatch({
    type: UPDATE_INSTANCE,
    key,
    instance,
  });
}

export function saveInstanceArray(instance, identifier) {
  return dispatch({
    type: SAVE_INSTANCE_ARRAY,
    identifier,
    instance,
  });
}

export function updateInstanceArray(identifier, instance) {
  return dispatch({
    type: UPDATE_INSTANCE_FROM_ARRAY,
    identifier,
    instance,
  });
}

export function removeInstanceArray(identifier, instance) {
  return dispatch({
    type: REMOVE_INSTANCE_FROM_ARRAY,
    identifier,
    instance,
  });
}
