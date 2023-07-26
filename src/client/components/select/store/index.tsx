import React, { forwardRef, Ref, useEffect, useState, useImperativeHandle } from "react";
import { Divider, Select, Space } from "antd";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "@recoil/atoms";
import { getMyStores } from "@api/store";
import { getFilteredResults, requestLogin } from "@core/utils";
import { RefObject, TOption, TStore } from "@components/types";
import { Link} from "@renderer/Link"
import { useLocation } from "react-router-dom";

interface Props {
    callback?: Function;
    specialCallback?: Function;
    selectClass?: string;
    noDefault?: boolean;
}
interface FProps extends Props {
    ref: Ref<RefObject>
}


export const StoreSelect: React.FC<FProps> = forwardRef((props: Props, ref: Ref<RefObject>) => {
    const _selectClass = props?.selectClass || "w-60 sm:w-36";
    const [stores, setStores] = useState < TStore[] > ([]);
    const [selectedStore, setSelectedStore] = useState < TStore > ();
    const [options, setOptions] = useState < TOption[] > ([]);
    const location = useLocation()
    const isLogin = useRecoilValue(isLoggedIn);

    useImperativeHandle(ref, () => ({ fetchObjects }));

    const handleChange = (value: string) => {
        let store = stores.filter((store) => store.id === parseInt(value));
        if (store.length > 0) {
            setSelectedStore(store[0]);
        }
    };

    const handleSearch = (value: string) => {
        setOptions(getFilteredResults(value, stores));
    };

    const fetchObjects = () => {
        getMyStores().then((result: TStore[]) => {
            setStores(result);
            if (selectedStore == undefined && props.noDefault !== true) {
                setSelectedStore(result[0]);
            } else {
                let store = result.filter((store) => store.id === selectedStore.id);
                if (store.length > 0) {
                    setSelectedStore(store[0]);
                }
            }
        }).catch((e) => {
            console.log("Error: " + e.toString());
            if (e.response?.status === 401) {
                requestLogin(location.pathname);
            }
        })
    }

    useEffect(() => {
        if (props?.callback != undefined) {
            props.callback(selectedStore);
        }
    }, [selectedStore])

    useEffect(() => {
        setOptions(getFilteredResults(undefined, stores));
    }, [stores])


    useEffect(() => {
        if (!isLogin) {
            requestLogin(location.pathname);
        }
        fetchObjects();
    }, [])

    return (
        <Select
            showSearch
            className={_selectClass}
            value={selectedStore?.id.toString()}
            onChange={handleChange}
            onSearch={handleSearch}
            filterOption={false}
            options={options}
            showArrow={false}
            placeholder="Select a store"
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                        <Link href="/business/account?form=true">
                            <button className="flex w-full" onClick={() => {
                                // if (props.specialCallback != undefined) {
                                //     props.specialCallback();
                                // }
                                setSelectedStore(null)
                            }}>
                                + Add a new store
                            </button>
                        </Link>
                    </Space>
                </>
            )}
        />
    );
});
