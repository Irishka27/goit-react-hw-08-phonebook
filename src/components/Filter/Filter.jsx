import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/phonebook/phonebook-selectors';
import {  changeFilter } from '../../redux/phonebook/phonebook-actions';
import s from './Filter.module.css';

function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();
  
  const changedFilter = e => {
    dispatch(changeFilter(e.target.value));
  }

  return (
    <div className={s.filter}>
      <label className={s.label}>Find contact by name
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={changedFilter}
      /></label>
    </div>
  );
}

export default Filter;