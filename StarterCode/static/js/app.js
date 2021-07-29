// let samples = "../../data/samples.json"

let samples = "data/samples.json"

d3.json(samples).then(function(data){
    console.log(data)
});
