import { Header } from '@components/header'
import { Container } from '@components/container'
import React, { Fragment } from 'react';
import { Page as PdfPage, Document, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { TOrder, TOrderItem } from '@components/types';
import moment from 'moment';
import { getProductVariantName, groupBy } from '@core/utils';

const styles10 = StyleSheet.create({

    titleContainer: {
        flexDirection: 'row',
        marginTop: 12
    },
    reportTitle: {
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});


const InvoiceThankYouMsg = () => (
    <View style={styles10.titleContainer}>
        <Text style={styles10.reportTitle}>Thank you for your business</Text>
    </View>
);

const styles12 = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 12,
        flexGrow: 1
    },
    description: {
        width: '25%',
        fontSize: 8,
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    item_code: {
        width: '50%',
        fontSize: 8,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    qty: {
        width: '25%',
        fontSize: 8,
        textAlign: 'left',
        textTransform: 'uppercase',
        flexWrap: 'wrap'
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }

});

const InvoiceTop = ({ invoice }) => (
    <View>
        <View style={styles12.container}>
            <Text style={styles12.description}>Original</Text>
            <Text style={styles12.item_code}>Invoice</Text>
            <Text style={styles12.qty}>E-invoice</Text>
        </View>
        <View style={styles12.container}>
            <Image style={styles.logo} src={invoice?.store?.logo} />
            <View style={{ width: '50%' }}>
                <Text style={styles12.qty}>IRN: {invoice?.info?.gst_response?.IRN}</Text>
                <Text style={styles12.qty}>Ack No.: {invoice?.info?.gst_response?.AckNo}</Text>
            </View>
            <Image style={styles.logo} src={invoice?.info?.gst_response?.qrcode} />
        </View>
    </View>
);



const borderColor = '#000000'

const styles11 = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        width: '50%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        flexDirection: "column"
    },
    right: {
        width: '50%',
        flexDirection: "column"
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
    },
    gstin: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bill_to: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    description: {
        textAlign: 'left',
        paddingLeft: 8,
    },
    phone: {
        width: '75%',
        textAlign: 'right',
        paddingRight: 8,
    },
    total: {
        textAlign: 'right',
        width: '15%',
        paddingRight: 8,
    },
    city: {
        width: '50%',
        flexDirection: "row"
    },
    pincode: {
        width: '50%',
        flexDirection: "row"
    }
});

const styles13 = StyleSheet.create({
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    name: {
        width: '100%',
        textAlign: 'center',

    },
    address: {
        width: '100%',
        textAlign: 'center',
    },
})
const InvoiceHeader = ({ store }) => (
    <View>
        <View style={styles13.nameRow}>
            <Text style={styles13.name}>{store?.name}</Text>
        </View>
        <View style={styles13.row}>
            <Text style={styles13.address}>{[store?.address?.house_number, store?.address?.street_name, store?.address?.city?.name, store?.address?.state?.name, store?.address?.pincode].filter((x) => x != undefined).join(", ")}</Text>
        </View>
    </View>
)

const InvoiceDetails = ({ invoice }) => (
    <View style={styles11.container}>
        <View style={styles11.left}>
            <View>
                <Text style={styles11.description}>GSTIN : {invoice?.store?.gstin}</Text>
                <Text style={styles11.description}>State Name : { }</Text>
                <Text style={styles11.description}>Contact : {invoice?.store?.phone}</Text>
                <View style={styles11.row}>
                    <Text style={styles11.description}>Email : {invoice?.store?.email}</Text>
                </View>
            </View>
            <View>
                <Text style={styles11.description}>Consignee (Bill To)</Text>
                <Text style={styles11.description}>{invoice?.user?.full_name}</Text>
                <Text style={styles11.description}>{[invoice?.billing_address?.house_number, invoice?.billing_address?.street_name].filter((x) => x != "").join(", ")}</Text>
                <Text style={styles11.description}>{invoice?.billing_address?.locality}</Text>
                <Text style={styles11.description}>{invoice?.billing_address?.city?.name}</Text>
                <View style={styles11.bill_to}>
                    <Text style={styles11.phone}>Phone: </Text>
                    <Text style={styles11.total}>{invoice?.user?.phone}</Text>
                </View>
                <View style={styles11.bill_to}>
                    <View style={styles11.city}>
                        <Text style={styles11.description}>City: </Text>
                        <Text style={styles11.description}>{invoice?.billing_address?.city?.name}</Text>
                    </View>
                    <View style={styles11.pincode}>
                        <Text style={styles11.description}>PinCode: </Text>
                        <Text style={styles11.description}>{invoice?.billing_address?.pincode}</Text>
                    </View>
                </View>
                <View style={styles11.gstin}>
                    <Text style={styles11.description}>GSTIN: </Text>
                    <Text style={styles11.description}>{invoice?.info?.gstin}</Text>
                </View>
                <View style={styles11.row}>
                    <View style={styles11.city}>
                        <Text style={styles11.description}>State Name: </Text>
                        <Text style={styles11.description}>{invoice?.billing_address?.state?.name}</Text>
                    </View>
                    <View style={styles11.pincode}>
                        <Text style={styles11.description}>State Code: </Text>
                        <Text style={styles11.description}>{invoice?.billing_address?.state_id}</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles11.description}>Buyer (Ship To)</Text>
                <Text style={styles11.description}>{invoice?.user?.full_name}</Text>
                <Text style={styles11.description}>{[invoice?.shipping_address?.house_number, invoice?.shipping_address?.street_name].filter((x) => x != undefined).join(", ")}</Text>
                <Text style={styles11.description}>{invoice?.shipping_address?.locality}</Text>
                <Text style={styles11.description}>{invoice?.shipping_address?.city?.name}</Text>
                <View style={styles11.bill_to}>
                    <Text style={styles11.phone}>Phone: </Text>
                    <Text style={styles11.total}>{invoice?.user?.phone}</Text>
                </View>
                <View style={styles11.bill_to}>
                    <View style={styles11.city}>
                        <Text style={styles11.description}>City: </Text>
                        <Text style={styles11.description}>{invoice?.shipping_address?.city?.name}</Text>
                    </View>
                    <View style={styles11.pincode}>
                        <Text style={styles11.description}>PinCode: </Text>
                        <Text style={styles11.description}>{invoice?.shipping_address?.pincode}</Text>
                    </View>
                </View>
                <View style={styles11.gstin}>
                    <Text style={styles11.description}>GSTIN: </Text>
                    <Text style={styles11.description}>{invoice?.info?.gstin}</Text>
                </View>
                <View style={styles11.bill_to}>
                    <View style={styles11.city}>
                        <Text style={styles11.description}>State Name: </Text>
                        <Text style={styles11.description}>{invoice?.shipping_address?.state?.name}</Text>
                    </View>
                    <View style={styles11.pincode}>
                        <Text style={styles11.description}>State Code: </Text>
                        <Text style={styles11.description}>{invoice?.shipping_address?.state_id}</Text>
                    </View>
                </View>
                <View style={styles11.row}>
                    <Text style={styles11.description}>Place Of Supply: </Text>
                    <Text style={styles11.description}>{invoice?.supply_address?.state?.name}</Text>
                </View>
            </View>
        </View>
        <View style={styles11.right}>
            <View style={styles11.container}>
                <View style={styles11.left}>
                    <View>
                        <Text style={styles11.description}>Invoice No.</Text>
                        <View style={styles11.row}>
                            <Text style={styles11.description}>{invoice?.short_id}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles11.description}>Delivery Note</Text>
                        <View style={styles11.row}>
                            <Text style={styles11.description}>-</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles11.description}>Dated</Text>
                        <View style={styles11.row}>
                            <Text style={styles11.description}>{invoice?.short_id}</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles11.description}>Destination</Text>
                        <View style={styles11.row}>
                            <Text style={styles11.description}>-</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles11.description}>Buyer Order No.</Text>
                        <View style={styles11.row}>
                            <Text style={styles11.description}>-</Text>
                        </View>
                    </View>
                </View>
                <View style={styles11.right}></View>
            </View>
        </View>
    </View >
);

const styles9 = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    left: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    right: {
        width: '40%',
        borderLeftColor: borderColor,
        borderLeftWidth: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
    },
    description: {
        width: '70%',
        textAlign: 'left',
        fontStyle: 'bold',
        paddingLeft: 8,
    },
    total: {
        width: '10%',
        textAlign: 'right',
        paddingRight: 8,
    },
});


const InvoiceTableFooter = ({ invoice }) => (
    <View style={styles9.container}>
        <View style={styles9.left}>
            -
        </View>
        <View style={styles9.right}>
            <View style={styles9.row}>
                <Text style={styles9.description}>Total</Text>
                <Text style={styles9.total}></Text>
            </View>
            <View style={styles9.row}>
                <Text style={styles9.description}>Taxable Amount</Text>
                <Text style={styles9.total}></Text>
            </View>
            <View style={styles9.row}>
                <Text style={styles9.description}>CGST</Text>
                <Text style={styles9.total}>{(invoice?.tax / 2)?.toFixed(2)}</Text>
            </View>
            <View style={styles9.row}>
                <Text style={styles9.description}>SGST</Text>
                <Text style={styles9.total}>{(invoice?.tax / 2)?.toFixed(2)}</Text>
            </View>
            <View style={styles9.row}>
                <Text style={styles9.description}>Total Tax</Text>
                <Text style={styles9.total}>{invoice?.tax?.toFixed(2)}</Text>
            </View>
            <View style={styles9.row}>
                <Text style={styles9.description}>Grand Total</Text>
                <Text style={styles9.total}>{Math.round(invoice?.payable).toFixed(2)}</Text>
            </View>
        </View>
    </View>
)

const styles8 = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white'
    },
    description: {
        width: '40%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    item_code: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    tax_amount: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    total: {
        width: '15%',
    },

});


const InvoiceTableBlankSpace = ({ rowsCount }) => {
    const blankRows = Array(rowsCount).fill(0)
    const rows = blankRows.map((x, i) =>
        <View style={styles8.row} key={`BR${i}`}>
            <Text style={styles8.description}>-</Text>
            <Text style={styles8.item_code}>-</Text>
            <Text style={styles8.qty}>-</Text>
            <Text style={styles8.rate}>-</Text>
            <Text style={styles8.rate}>-</Text>
            <Text style={styles8.tax_amount}>-</Text>
            <Text style={styles8.total}>-</Text>

        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

const styles7 = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '40%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    item_code: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    tax_amount: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
});


const InvoiceTableRow = ({ items }: TOrderItem[]) => {
    const rows = items.map((item: TOrderItem) =>
        <View style={styles7.row}>
            <Text style={styles7.description}>{getProductVariantName(item?.inventory?.product?.name, item?.inventory?.variant?.name)}</Text>
            <Text style={styles7.item_code}>{item.inventory?.variant?.gtin}</Text>
            <Text style={styles7.qty}>{item.quantity}</Text>
            <Text style={styles7.rate}>{item.price}</Text>
            <Text style={styles7.rate}>{item.inventory?.tax_rate}</Text>
            <Text style={styles7.tax_amount}>{item.total_tax}</Text>
            <Text style={styles7.total}>{item?.total_payable?.toFixed(2)}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};


const styles6 = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        backgroundColor: '#E2E2E2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '40%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    item_code: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    tax_amount: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    total: {
        width: '15%'
    },
});

const InvoiceTableHeader = () => (
    <View style={styles6.container}>
        <Text style={styles6.description}>Product/Service</Text>
        <Text style={styles6.item_code}>Item Code</Text>
        <Text style={styles6.qty}>Qty</Text>
        <Text style={styles6.rate}>Rate</Text>
        <Text style={styles6.rate}>IGST %</Text>
        <Text style={styles6.tax_amount}>Tax Amt</Text>
        <Text style={styles6.total}>Total</Text>
    </View>
);


const tableRowsCount = 5;

const styles5 = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#000000',
    },
});

const InvoiceItemsTable = ({ invoice }) => (
    <View style={styles5.tableContainer}>
        <InvoiceHeader store={invoice?.store} />
        <InvoiceDetails invoice={invoice} />
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice?.orderitems} />
        <InvoiceTableBlankSpace rowsCount={tableRowsCount - invoice.orderitems.length} />
        <InvoiceTableFooter invoice={invoice} />
    </View>
);

const styles4 = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
});


const BillTo = ({ invoice }) => (
    <View style={styles4.headerContainer}>
        <Text style={styles4.billTo}>Bill To:</Text>
        <Text>{invoice.company}</Text>
        <Text>{invoice.address}</Text>
        <Text>{invoice.phone}</Text>
        <Text>{invoice.email}</Text>
    </View>
);
const styles3 = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 60
    }

});


const InvoiceNo = ({ invoice }) => (
    <Fragment>
        <View style={styles3.invoiceNoContainer}>
            <Text style={styles3.label}>Invoice No:</Text>
            <Text style={styles3.invoiceDate}>{invoice.invoice_no}</Text>
        </View >
        <View style={styles3.invoiceDateContainer}>
            <Text style={styles3.label}>Date: </Text>
            <Text >{invoice.trans_date}</Text>
        </View >
    </Fragment>
);
const styles2 = StyleSheet.create({

    titleContainer: {
        flexDirection: 'row',
        marginTop: 24,
    },
    reportTitle: {
        color: '#61dafb',
        letterSpacing: 4,
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});


const InvoiceTitle = ({ title }) => (
    <View style={styles2.titleContainer}>
        <Text style={styles2.reportTitle}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        lineHeight: 1.5,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#000000'
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const Invoice = ({ order }: TOrder) => (
    <Document>
        <PdfPage size="A4" style={styles.page}>
            <InvoiceTop invoice={order} />
            {/* <InvoiceTitle title='Invoice' /> */}
            {/* <InvoiceNo invoice={order} />
            <BillTo invoice={order} /> */}
            <InvoiceItemsTable invoice={order} />
        </PdfPage>
    </Document>
);

const order: TOrder = {
    store_id: 162,
    store: {
        "id": 162,
        "name": "Business Name",
        "category_id": 1,
        "phone": "9999999999",
        "email": "contact@company.com",
        'manager_id': null,
        "image": "",
        "is_delivery": true,
        "is_pickup": true,
        "logo": "https://business.jhattse.com/business/assets/noimage.png",
        "gstin": "000AAAA000AAAA",
        "type": "Local",
        "meta": {
            "fssai": "208XXXXXXXXXXX",
            "drug_licence_number": "DN87XX",
        },
        "address": {
            "type": "Home",
            "house_number": "24",
            "street_name": "Nath Lane",
            "locality": "Rajpath",
            "city": {
                "name": "City"
            },
            "state": {
                "name": "State"
            },
            "city_id": 1,
            "pincode": "000000",
            "latitude": 30.3044411,
            "longitude": 78.0941689,
            "state_id": 104,
            "is_default": true
        }
    },
    address_id: null,
    delivery_mode: "pickup",
    payment_mode: "CASH",
    id: "",
    short_id: 1,
    bill_id: "20230100001",
    is_paid: true,
    payable: 1740,
    tax: 240,
    taxable_amount: 1500,
    orderitems: [
        {
            "is_fulfilled": false,
            "quantity": 1,
            "inventory_id": 1,
            "total_cost": 1000,
            "total_payable": 1180,
            "total_tax": 180,
            "id": "",
            "mrp": 1000,
            "price": 1000,
            "order_id": "",
            "inventory": {
                "mrp": 1000,
                "price": 1000,
                "is_live": true,
                "product_id": 1,
                "variant_id": 1,
                "store_id": 162,
                "always_available": false,
                "tax_exclusive": true,
                "tax_rate": 18,
                "id": 1,
                "is_available": true,
                "product": {
                    "name": "Sample Product 1",
                    "gtin": "ITEMCODE01",
                    "brand_id": 506,
                    "category_id": 4,
                    "mrp": 1000,
                    "description": "",
                    "private": false,
                    "id": 1,
                    "owner_id": 1,
                    "category": {
                        "name": "Product Category 01",
                        "image": "",
                        "master_id": 3,
                        "id": 4
                    },
                    "variants": [
                        {
                            "name": "",
                            "mrp": 499,
                            "hsn_id": 1,
                            "description": "",
                            "gtin": "ITEMCODE01",
                            "product_id": 1,
                            "id": 1
                        }
                    ],
                    "added_on": "2023-01-12T01:02:41.307585+05:30",
                    "updated_on": "2022-01-12T01:02:41.307585+05:30"
                },
                "variant": {
                    "name": "",
                    "mrp": 1000,
                    "description": "",
                    "gtin": "ITEMCODE01",
                    "product_id": 1,
                    "id": 1
                }
            },
            "added_on": "2023-05-22T17:24:55.050628+05:30",
        },
        {
            "is_fulfilled": false,
            "quantity": 5,
            "inventory_id": 2,
            "total_cost": 500,
            "total_payable": 560,
            "total_tax": 60,
            "id": "",
            "mrp": 0,
            "price": 100,
            "order_id": "",
            "inventory": {
                "mrp": 100,
                "price": 100,
                "is_live": true,
                "product_id": 2,
                "variant_id": 2,
                "store_id": 162,
                "tax_exclusive": true,
                "always_available": false,
                "tax_rate": 12,
                "id": 2,
                "is_available": true,
                "product": {
                    "name": "Sample Product 2",
                    "gtin": "ITEMCODE02",
                    "brand_id": 455,
                    "category_id": 4,
                    "mrp": 100,
                    "description": "",
                    "private": false,
                    "id": 232,
                    "owner_id": 1,
                    "category": {
                        "name": "Product Category 02",
                        "image": "",
                        "master_id": 2,
                        "id": 2
                    },
                    "variants": [
                        {
                            "name": "",
                            "mrp": 100,
                            "description": "",
                            "gtin": "ITEMCODE02",
                            "product_id": 2,
                            "id": 2
                        }
                    ],
                    "added_on": "2022-09-15T01:02:41.307585+05:30",
                    "updated_on": "2022-09-15T01:02:41.307585+05:30"
                },
                "variant": {
                    "name": "",
                    "mrp": 100,
                    "description": "",
                    "gtin": "ITEMCODE02",
                    "product_id": 2,
                    "id": 2
                }
            },
            "added_on": "2023-05-22T17:24:55.050628+05:30"
        },
    ],
    user: {
        first_name: "Mr. Shiva",
        last_name: "Shankar",
        full_name: "Mr. Shiva Shankar",
        email: "shiva@company.com",
        phone: "9999999999"
    },
    added_on: moment(moment()).format('YYYY-MM-DDT00:00:00'),
    updated_on: moment(moment()).format('YYYY-MM-DDT00:00:00'),
    user_id: 0,
    link: "",
    info: {
        address: "Lane no. , Street, City, State, Pin code",
        ref_by: "Dr Kohli",
        gstin: "05AAHCE4252A1Z7",
        gst: true,
        template: "GST Enterprises",
        gst_response: {
            IRN: "712689cf5c398e40f843e8b49870b78661872ebc6673deb5fff7ab1170ea332e",
            AckNo: "162314411521991",
            AckAt: "2023-07-31T11:29:25",
            qrcode: "data:image/webp;base64,UklGRtwHAABXRUJQVlA4TM8HAAAvSUFSEAdmIG2b+Le97bcQYSBtW/x0TwcgRAkBiJbRAhlRQAYCBEJCCHELgbgFSIAMBAIEAhNgwjyICAxABhItQHzwv+3/4jj9/z1qWSR1CbJBlw1tcLJlakEqqSya2lRSZNEg4fl8pk+CbYumxWGwwQcJbkGn9vjjcj1sZuG3aUT/J0Cc9P9J/58M6uJqwof0ZlZxOc2p4mU2Rqr6iwwsr2qvoqFqwhenRVUmvKCXlxhRWWLXRlPqewYiqR1TQSa8mlHlo7bTP7rwwzhub+NNdO44XmLg1TZeRKvHsdXGIxZ+bDv9UXq1hdOhC4qB0K9JbBqoCf1AYlFg30IonG5nZrmiYXHYhdwE/setsQm8vaF/5wQ2+G8XhhsWr5hKGtJixQXFoluKHalfFhhJbSsVabGRleah1uAHaHYdr7fxbkt/bx0/NLChrn3zv5VYDu6TVQWTNYFdAzaz6Vy/dvC1BoqTuNPG5Fp8YBK3rsX/TuKCf002yxK7NnyBHYmewEBiMbPNcMXiXBuHXtZ+gvIVHH8ZH67gfhvvv4y/JmNuxeLwVOKmiVhqR6ToSewI9G2YdMvNzCs/hk7/ZeH3ElZCfDIht5bwAwOvh4PfNvBX6PSP6ZVUA32BRYlBQjyBgYG+HBwbSGrGlKFCwmfonejhWwWcb+CPHv5Cv/RwSwEP9HCsgG/18ITejELCh9IiPUkxEvoKVmsCuxLLAiOprfBvMzPG5lj/Zhtvx7iEZuUGzyMZ42s0PYebDezO4WMxHjcwK4d9vSWx/iG6PsaHppJxqV+3EUosEOcVOCDFmgFfYEfqKygaKEj9l2mtxFYGhKG8/pt9XEyn5wcvsTEzj5v6+LeB//XxaHrl8vozp5JJqV8S+rE0r+BJ7Aj0DSh202tC6lczqtwQ6e8o4v5Iv1LEGU5dFeEDtDnCzTS/iE9HOOrCogi/MrAiwgeLeFeEv6aXyZbEtUI/lFhwys2ORE9YNKBYMqBYl9gQ2M6oMqeMZxvYFuCYgScDHCvjETgWYOjWGWVsBXi5gdEy/gFHyvrrKCjr+wFupF0BXpUWVYltA272pHZfYNGtpsSasBjJZLdE+mcOOewl80AXj8OfHm5yq9bFHR4uMLC/i0dd+KGL7xk4x8Mz0yupBYExmHRDsSPRM6DYd+FlgWsNTEgcz8wSdvAjGy90cEsNH+sMfsqtkRqO2PBq+vs72gfppw7utLG6g3tqeFZ6TQhs2SgJ7EnMicF5t3yJvo1A6ueFdoFCoW9CsS2xmi1lpKk/RiubFnf7eF8TZ0CuqX+LgREfb2/ilXRtE/f6+KWBhj94O81u4r0+XmfgdR8vTa+khhILIpE1iU1hsSsdjEmxJPFlA4qNDC8rmxZ3+3ga3dvU3kVnNLFmIGjilQbW+PilhWNN/Xt93NvEF+l1Hy+lMR/PmQJa0mJJ6MdSO6KyxK4BRd+AYmDBZCiwIvVbYkrP1LG0o7+altUsPtrBObS+NvjGhLzTsfgD+TX8C47WcDv91MGHa/rLaHVHf2laVKX+BFkNJRaI8wlxsyiwD7HAAim+LCxOSP1qRpXDHu7r4kra2cUSXeHhgS7OhJkeru3i6/R9F0N6ztN/me708FMDy73BK7v4Cn3uYZmu7OJmOsfDw+nVFtiQWKdJiRVS7EnMgWJRutgU+h3yBAYGOCf1Q6G/VmKLFNsZVeaU8WwDXwT4I30S6I+V8Y1A+1AZN9r4JsB1Ni4s46EAT4FpZf0RWhbgZ/RdgBvTy6SCmwWBsdSOBJZtKPo2FCOJebBakRYbWVeWR/o/011F/dfJK+JbEZ5XHDxKRyPsGXi2iPfTTxH2DTwX4VH6PDL/Ig0VcSs9XsS7IrytiKemRVVarAv9l6kksCcxJwbnyWpHoE8mFQLpckiKa6klcELiuEjbrCAz8/p3G/h/H4/R7308QX38Oo+j9G4er6Ujfbw/r/+UgVPy+LkLx/v6f04lJhsGJqXLfYFFCgR6pNgU+h0DipELVrMX7I7xZnoidlEhh+fF+BpdE+s/kNN/glblcBp9HKNCbPGIE7fkcHp6JTUGxUi46EsXy6TYh1hYrDihWM2WMlRI+AyKetpvFVy8x8DPPf2SCzMKuMDGYwW8q4e/p05VJrxABosymTXhooGCxNCGYkNgO+vKj6HTf1mYXkKP/gj1v6TvQ/zewHAJT6HzS/i73oIQD9r4IcR9JXwkxKtTpy2cDi3kpX4g9GvUFNg00JVYpkhqK5g00RI4IXFcpG12keGKxbnJ+KSCJQMHK3j3yzjm1JGKxV307ct445TUkBYryVDsGlD0hb4Tbk4K/ew2v03q70yNZyYHH6A/J/GwjXPX4vP/wCJhMXF5MThHPYElG3Wpn3Xm5vrgrS1sGDi7jk8beKGOFxh4uI4PtnBrffD2pB2sY/GfRiwH94VFT7pYM6BYFNiX2klRrGZduaJhcdiFeAK32XivgS/RSw0cpesb+JWFYw2s08KG/u0TeEfD4nnp5aYNxchGR6BPvrAYWIiFi2sltkT6Zw75qO30jwY2jw/eSr+29Q8bGB3HO9v6F9HqcczrHW/jfVRo679iY20bL06dpCpwnqwqKDalvkcmSbFHJWnRRFtiNVvK4mrCh/RmVl1camCkqr/Ixsqq9jU0u2px1MDFVVycFif9f9L/J/kJAA=="
        }
    }
}


export const Page: React.FC = () => {
    return (
        <Container>
            <Header />
            <Fragment>
                <PDFViewer width="1000" height="600" className="app" >
                    <Invoice order={order} />
                </PDFViewer>
            </Fragment>
        </Container>
    )
}
