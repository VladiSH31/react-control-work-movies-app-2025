import './SearchComponent.css'

const SearchComponent = () => {
    return (
        <form>
            <input type={'text'} placeholder={'Search...'} className={'search-input'}/>
        </form>
    );
};

export default SearchComponent;