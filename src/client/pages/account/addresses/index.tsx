import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { BackBar } from "@components";
import AddressPanel from "@components/address";


const Addresses = () => {

  return (
    <div>
      <BackBar />
      <div className="px-20 sm:px-0">
        <div className="sm:hidden h-20 flex items-center text-sm text-manrope">
          <Breadcrumb className="font-normal text-lg list-none text-breadcrumbs">
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='/account'>Account</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem className='font-normal text-ellipsis text-left break-words line-clamp-1' isCurrentPage>
              <BreadcrumbLink href='/addresses'>My Addresses</BreadcrumbLink>
              <ol className="p-0 list-none"></ol>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <AddressPanel
          customStyle="grid grid-cols-2 sm:grid-cols-1 gap-4 rounded-xl"
          isDone={() => { }}
          heading="My Addresses" btnPlacedButtom={true} />
      </div>
    </div>
  )
}

export default Addresses;