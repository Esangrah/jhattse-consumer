import React, { useState, useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import AddressPanel from '@components/address';
import { BackBar, Title } from '@components';
import { Link} from "react-router-dom"
import { TCartItem } from '@components/types';
import { useRecoilValue } from 'recoil';
import { cartState } from '@recoil/atoms';
import { useNavigate, useLocation } from 'react-router-dom';
import { AddressSmallCard, OrderInfoCard, StoreCartContainer } from '@components/cards';

const OrderPage = () => {
    const [stage, setStage] = useState < number > (1);
    const [screen, setScreen] = useState < Map < number, boolean>> (new Map([[2, true]]));
    const navigate = useNavigate();
    const location = useLocation();
    const cart = useRecoilValue(cartState);

    const ChangeAddress = () => {
        navigate('/account/addresses')
    }

    // const cartItem = cartItems.map()

    useEffect(() => {
        let id = location.pathname.match(/#([a-z0-9]+)/gi)
        if (id?.length > 0) {
            setStage(parseInt(id.toString().substring(1)));
        } else {
            setStage(1);
        }
    }, [location])

    const onNext = () => {
        console.log(stage);
        if (stage < 3) {
            setStage(stage + 1);
            navigate(`/order/#${stage + 1}`)
        }
    }

    const setScreenValid = (order: number) => {
        const setScreenValidState = (validState: boolean) => {
            const updatedScreen = new Map < number, boolean> (screen);
            updatedScreen.set(order, validState);
            setScreen(updatedScreen);
        }
        return setScreenValidState;
    }

    const groupBy = (arr: TCartItem[]) => {
        const groupedMap = arr.reduce(
            (entryMap: Map<number, TCartItem[]>, e: TCartItem) => entryMap.set(e.inventory?.store_id, [...entryMap.get(e.inventory?.store_id) || [], e]),
            new Map()
        );
        return groupedMap;
    }


    let component = null;
    switch (stage) {
        case 1:
            const deliveryItems = Array.from(cart.values()).filter((item: TCartItem) => { return item.deliverable; })
            const pickupItems = Array.from(cart.values()).filter((x: TCartItem) => !x.deliverable);
            component =
                <div>
                    <Title title="Order Summary" />
                    <div className="grid gap-2 py-2 px-2 sm:px-0 w-1/2 sm:w-full" >
                        {deliveryItems.length > 0 && <div>
                            <div className="flex justify-between bg-success-900 px-2 py-1 rounded-t-lg">
                                <span className="font-semibold text-base text-neutral-50">Deliver To</span>
                                <span><button className="text-neutral-50 font-semibold flex flex-row items-center gap-1" onClick={ChangeAddress}>CHANGE<FaRegEdit /></button></span>
                            </div>
                            <AddressSmallCard />
                        </div>}
                        <StoreCartContainer cartItems={deliveryItems} />
                        <div className="flex flex-col gap-3">
                            {Array.from(groupBy(pickupItems).values()).map((storePickupCartItems: TCartItem[]) => {
                                return <StoreCartContainer cartItems={storePickupCartItems} />
                            })}
                        </div>
                        <div>
                            <OrderInfoCard />
                        </div>
                    </div>
                </div>
            break;
        case 2:
            component = <AddressPanel isDone={(state: boolean) => { setScreenValid(1)(state); }} title="Select delivery address" />// <OrderSummary> </OrderSummary> // Sort the cart items bunch by stores and sort by deliverable show deliverable items on top
            break;
        default:
            component = <div className="w-full h-screen flex flex-col justify-center items-center"><Link to={"upi://pay?pa=9935394958@upi&amp;pn=Pay to Jhatt&amp;cu=INR"}><button className="bg-success-500 justify-end sm:text-sm text-neutral-50 font-semibold p-2 hover:bg-success-900 focus:bg-brand-900 whitespace-nowrap rounded-md">Make Payment</button></Link></div>
            break;
    }
    return (
        <div className="flex flex-col">
            <BackBar />
            {component}
            <div className="h-20"></div>
            <div className="bg-neutral-50 fixed bottom-0 justify-center w-1/2 sm:w-full p-4">
                <button onClick={() => onNext()} className={`w-full bg-brand-500 justify-end sm:text-sm text-neutral-50 font-semibold p-2 hover:bg-brand-500 focus:bg-brand-500 whitespace-nowrap rounded-md ${screen.get(stage) === true ? "" : "cursor-not-allowed"}`} disabled={screen.get(stage) !== true}>Proceed to pay</button>
            </div>
        </div>
    )
}

export default OrderPage