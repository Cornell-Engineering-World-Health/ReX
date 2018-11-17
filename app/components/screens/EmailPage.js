import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native'
import {MailComposer, FileSystem} from 'expo'
import Line from '../screens/LineChart.js'
class CoolerMedicineView extends React.Component{
    
    static propTypes = {
    };
    constructor (props){
        super(props)

        this.state = {
          color: '#ff00ff',
          stockData: [  
            {
                Symbol: "AAPL",
                Company: "Apple Inc.",
                Price: 132.54
            },
            {
                Symbol: "INTC",
                Company: "Intel Corporation",
                Price: 33.45
            },
            {
                Symbol: "GOOG",
                Company: "Google Inc",
                Price: 554.52
            },
        ]
        }
    }

    convertArrayOfObjectsToCSV(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    //arrow automatically binds stuff to the constructor
    _handleClick = () => {
        var csv = this.convertArrayOfObjectsToCSV({
            data: this.state.stockData,
            //lineDelimiter: "%0",
            //columnDelimiter: "%20",

        });
        //csv = 'https://data:text/csv;charset=utf-8,' + csv;
        var data = encodeURI(csv)

        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + `doctor_data`).catch(e => {
            console.log(e, 'Directory exists')
          })
        FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}doctor_data/data.txt`, csv)
        
        //console.log("-----------")
        //console.log(FileSystem.readAsStringAsync(FileSystem.cacheDirectory+"test1_file.txt"))
        MailComposer.composeAsync({
            recipients:['cyr7@cornell.edu'],
            subject: "attachment test",
            body: "hello", 
            attachments:[`${FileSystem.documentDirectory}doctor_data/data.txt`]
        })
        //https://docs.expo.io/versions/latest/sdk/mail-composer
    }

    render(){

        const data = [1,2,3,4,5,13,2,3,4,5,1,1,2,2,23,1,7]
        fill = '#afeeee'
        return(
            <View style = {styles.wrapper}>
                <TouchableOpacity onPress={this._handleClick}>
                    <Line/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titlestyle: {
      fontSize: 20,
      fontWeight: '600',
      color: 'green'
    },
    wrapper: {
        marginTop: 200,
        justifyContent: 'center',
    }
})

export default CoolerMedicineView
