import { useEffect, useState } from "react";
import Link from "next/link";
import { profileService } from "core/services";
import { useSelector } from "react-redux";
import { utils } from "../../core/helper";

const MySavedAdvanceSearches = () => {
    const reload = useSelector((state) => state.common?.reloadAction);
    const [advanceSearchList, setAdvanceSearchList] = useState([]);

    const getAdvanceSearchList = async () => {
        const resp = await profileService.getSearchProfile();
        if (resp && resp.meta.code === 200) {
            setAdvanceSearchList(resp.data);
        }
    };

    const handleRemoveSavedSearch = async (id) => {
        const resp = await profileService.removeSavedSearches(id);
        if (resp && resp.meta.code === 200) {
            getAdvanceSearchList();
            utils.showSuccessMsg(resp.meta.message);
        }
    };

    useEffect(() => {
        getAdvanceSearchList();
    }, [reload]);

    return (
        <div class="db-nav">
        <div class="db-nav-list">

            <h5>Search </h5>
            {advanceSearchList.length > 0 ? (
                <ul>
                    {advanceSearchList.map((ele, ind) => {
                        return (
                            <li key={ind} className="d-flex justify-content-between">
                                <Link href={`/search/advance/${ele.slug}`}>{ele.name}</Link>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSavedSearch(ele._id)}
                                    className="btn btn-sm bg-transparent btn-danger border-0 text-danger"
                                >
                                    <i className="fa fa-trash"></i>{" "}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No saved searches</p>
            )}
        </div>
        </div>

    );
};

export default MySavedAdvanceSearches;
