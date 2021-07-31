// to read the file samples.json open the html from live server


//create a function to build both barchart and bubble chart based on the same sample

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

        // build a horizontal barchart for top ten bacteria cultures

        let yTicks = otu_ids.slice(0, 10).map(ticks=> `OTU ${ticks}`).reverse()

        let barData = [{
            x : sample_values.slice(0, 10).reverse(),
            y : yTicks,
            text : otu_labels.slice(0, 10).reverse(),
            type : "bar",
            orientation : "h"
        }];

        let barLayout = {
            title : `Top Ten Bacteria Cultures for ${sample}`,
            margin : {
                t: 40,
                r: 0,
                b: 50,
                l: 100
            }
        };
        
        Plotly.newPlot("bar", barData, barLayout)


        // build a horizontal barchart for top ten bacteria cultures

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
            title : `Bacteria Cultures for ${sample}`,
            margin : {
                t: 40,
                r: 20,
                b: 50,
                l: 30
            },
            hovermode : "closest",
            xaxis : {
                title : "OTU ID"
            }
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout)


    }); //this is the end of the data
    
}

//create a function to add metadata to the "Demographic info" panel

function addmetaData(sample){
    d3.json('data/samples.json').then(function(data){
        console.log(data);    

        let metadata = data.metadata;
        console.log(metadata);
        
        let resultArray = metadata.filter(sampleObject => sampleObject.id == sample);
        console.log(resultArray);

        let result = resultArray[0];

        // add data to the panel

        let panel = d3.select('#sample-metadata');

        // clear the panel from previously selected sample

        panel.html("");

        Object.entries(result).forEach(([key, value]) => {
            panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
        });

        // Bonus - create guage chart for wash frequency

        let wash_frequency = result["wfreq"];

        console.log(wash_frequency);

        var g_data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wash_frequency,
                title: { text: "Belly Button Washing Frequency <br> Scrubs per week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: { 
                    axis: { range: [0, 9]} 
                }
            }
        ];
        
        var g_layout = { width: 500, height: 500};

        Plotly.newPlot("gauge", g_data, g_layout);

    });//this is the end of the data
}

// create a initiate function to initiate both buildchart and addmetadata function by using the dropdown Menu

function init(){
    let dropDownMenu = d3.select('#selDataset');
    d3.json('data/samples.json').then(function(data){
        // console.log(data);

        sub_ID = data.names;
        console.log(sub_ID);
        sub_ID.forEach((sample) => {
            dropDownMenu.append("option").property("value", sample).text(sample);
        })
    });

    buildChart(940);

    addmetaData(940);
}

// create event handler onchange defined in index.html by creating the function on "optionChanged"

function optionChanged(sample){
    addmetaData(sample);
    buildChart(sample);
}

init()