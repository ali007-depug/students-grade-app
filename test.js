const sortData = [
    { name: "sdfd", id: "017/M/4021" },
    { name: "sdfd", id: "014/M/4023" },
    { name: "sdfd", id: "017/M/4002" },
    { name: "sdfd", id: "018/M/4001" },
    { name: "sdfd", id: "018/M/4005" },
    { name: "sdfd", id: "018/M/4009" },
    { name: "sdfd", id: "018/M/4002" },
];

const srt = sortData.sort((a,b)=>{
    const [ayear,,aid]= a.id.split("/")
    const [byear,,bid]= b.id.split("/")

    return parseInt(byear) - parseInt(ayear) || parseInt(aid) - parseInt(bid)
})

console.log(srt)