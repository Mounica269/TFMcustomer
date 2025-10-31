import { useEffect, useState } from "react";
import Link from "next/link";
import { profileService } from "core/services";
import { useSelector } from "react-redux";
import { utils } from "core/helper";

const MySavedSearches = () => {
    const reload = useSelector((state) => state.common?.reloadAction);
    const [searchList, setSearchList] = useState([]);

    const getSearchList = async () => {
        const resp = await profileService.getSearchProfile();
        if (resp && resp.meta.code === 200) {
            setSearchList(resp.data);
        }
    };

    const handleRemoveSavedSearch = async (id) => {
        const resp = await profileService.removeSavedSearches(id);
        if (resp && resp.meta.code === 200) {
            getSearchList();
            utils.showSuccessMsg(resp.meta.message);
        }
    };

    useEffect(() => {
        getSearchList();
    }, [reload]);

    return (
        <div class="db-nav">
            <div class="db-nav-list">
                <h5>Search </h5>
                {
                searchList.length > 0 ? (
                    <ul>
                        {
                            searchList.map((ele, ind) => {
                                return (
                                    <li key={ind} className="d-flex justify-content-between">
                                        <Link href={`/search/basic/${ele.slug}`}>
                                            {ele.name}
                                        </Link>
                                        <button type="button" onClick={() => handleRemoveSavedSearch(ele._id)} className="btn btn-sm bg-transparent btn-danger border-0 text-danger"><i className="fa fa-trash"></i> </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                ) : (
                    <span>No saved searches</span>
                )
            }
            </div>
        </div>
    );
};

export default MySavedSearches;
