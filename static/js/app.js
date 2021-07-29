// open the html from live server

// 
function buildChart(sample){
    d3.json('data/samples.json').then(function(data){
        console.log(data);

        //parse data 
        let samples = data.samples;
        console.log(samples);

        // filter for the required sample
        let resultArray = samples.filter(sampleObject => sampleObject.id == sample);
        console.log(resultArray);

        let result = resultArray[0];
        console.log(result);

        let otu_ids = result.otu_ids;
        console.log(otu_ids);
        let otu_labels = result.otu_labels;
        console.log(otu_labels);
        let sample_values = result.sample_values;
        console.log(sample_values);

        // build a horizontal barchart

        let yTicks = otu_ids.slice(0, 10).map(ticks=> `OTU ${ticks}`).reverse()

        let barData = [{
            x : sample_values.slice(0, 10).reverse(),
            y : yTicks,
            text : otu_labels.slice(0, 10).reverse(),
            type : "bar",
            orientation : "h"
        }];

        let barLayout = {
            title : "Top Ten Bacteria Cultures for the Sample",
            margin : {
                t: 30,
                r: 0,
                b: 20,
                l: 150
            }
        };
        

        Plotly.newPlot("bar", barData, barLayout)

        let bubbleData = [{
            x : otu_ids,
            y : sample_values,
            text : otu_labels,
            mode : "markers",
            marker : {
                size : sample_values,
                color : otu_ids,
                colorscale : "Earth"
            }
        }];

        let bubbleLayout = {
            title : "Bacteria Cultures for the Sample",
            margin : {
                t: 40,
                r: 20,
                b: 50,
                l: 20
            },
            hovermode : "closest",
            xaxis : {
                title : "OTU ID"
            }
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout)




    }); //this is the end of the data
    
}

function 

buildChart(950);
