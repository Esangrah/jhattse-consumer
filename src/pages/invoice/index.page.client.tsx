import { Header } from '@components/header'
import { Container } from '@components/container'
import React, { Fragment } from 'react';
import { Page as PdfPage, Document, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { TOrder, TOrderItem } from '@components/types';
import moment from 'moment';
import { getProductVariantName } from '@core/utils';

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

const borderColor = '#000000'

const styles9 = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
});


const InvoiceTableFooter = ({ invoice }) => (
    <View style={styles9.row}>
        <Text style={styles9.description}>TOTAL</Text>
        <Text style={styles9.total}>{invoice?.total_payable?.toFixed(2)}</Text>
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
            <Text style={styles7.description}>{getProductVariantName(item.inventory?.product?.name, item.inventory?.variant.name)}</Text>
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

const tableRowsCount = 11;

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

const InvoiceDetail = ({ order }) => {
    <Fragment>
        <View style={styles3.invoiceDateContainer}>
            <Text style={styles3.invoiceDate}>{order?.bill_id}</Text>
        </View>
    </Fragment>
}

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
            <InvoiceTitle title='Invoice' />
            <InvoiceDetail invoice={order} />
            {/* <InvoiceNo invoice={order} />
            <BillTo invoice={order} /> */}
            <InvoiceItemsTable invoice={order} />
            <InvoiceThankYouMsg />
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
