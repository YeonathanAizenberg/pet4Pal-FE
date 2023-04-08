import React, { useState, useEffect } from 'react';
import { Button} from 'react-bootstrap';
import PetModal from './PetModal';

function Search(props) {

    for (let i = 0 ; i < props.advSearch.pets.length ;i++) {
    props.advSearch.pets[i].height = props.advSearch.pets[i].height.toString()
    props.advSearch.pets[i].weight = props.advSearch.pets[i].weight.toString()
    }

    let SearchablePets = props.advSearch.pets;
    const [data,setData] = useState(SearchablePets);
    const exclude = [""];
    const [input, setInput] = useState("");
    const [isAdvanceSearchBtn, setIsAdvanceSearchBtn] = useState(true);
    const [isUser, setIsUser] = useState("MyPets");
    const handleSearch = (e) => {
        e.preventDefault();
        setInput(e.target.value);
        filterData(e.target.value)
    };

    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (!lowercasedValue) {
            setData(SearchablePets);
        }
        else {
            const filteredData = SearchablePets.filter(item => {
                return Object.keys(item).some(key =>
                    exclude.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });
            setData(filteredData);
        }
    }

    useEffect(() => {
        if (!props.userautho) {
            setIsUser("Search");
        }
    }, []);

    const toggle = () => {
        setInput("")
        if (isAdvanceSearchBtn) {
            setIsAdvanceSearchBtn(false)
            SearchablePets = props.search.pets;
        } else {
            setIsAdvanceSearchBtn(true)
            SearchablePets = props.advSearch.pets;
        }
    }

    return (
        <>
        <div className="pagesBackgroundColor searchPage" >
            <div className="pageHeaders">
                <h3 >Search Page</h3>
            </div>
            <Button onClick={toggle}>{!isAdvanceSearchBtn && "Go to Advance Search" || "Go to Normal Search(Cat or Dog or Name)"}</Button>
            <input type="text"
                placeholder="Search for a friend!"
                onChange={handleSearch}
                value={input} />
            <div className="petsCardsContainer" >{data.map((pet, index) => {
                return (
                    <PetModal key={pet.id} pet={pet} isAdvanceSearchBtn={isAdvanceSearchBtn} isUser={isUser}/>
                );
            })}
            </div>
        </div>
        </>
    );
}

export default Search;