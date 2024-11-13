import { Elysia, t} from "elysia";

export const example = new Elysia()
.get("/", () => "Hello Wourld",{
    detail: {
        tags: ["Example"],
        summary:"Helo",
        description:"HAHAHAHAHA"
    }
})
.post("/about/", ({body}) => {
  return {
    id: '666',
    msg: 'Helo' + body.name 
    }
  },
  {
    body: t.Object({
      name: t.String()
    }),
    detail: {
        tags: ["Example"],
        summary:"Get Helo World",
        description:"AM I JOKE TO U"
    }
  })