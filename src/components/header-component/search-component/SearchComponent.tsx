import './SearchComponent.css'
import {useNavigate} from "react-router-dom";
import type {FormEvent} from "react";
import {useAppDispatch} from "../../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../../redux/hooks/useAppSelector.tsx";
import {searchSliceAction} from "../../../redux/store/slices/searchSlice.ts";

const SearchComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {query} = useAppSelector(state => state.searchSlice)
    const result = query.trim()

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (result) {
            navigate(`/search?query=` + result)
        }
    }

    return (
        <form onSubmit={handleSearch}>
            <input className={'search-input'} type={'text'} placeholder={'Search...'} value={query} onChange={
                (event) => {
                    dispatch(searchSliceAction.setSearchQuery(event.target.value))
                }
            }
            />
        </form>
    );
};

export default SearchComponent;