const agent = require("./agent")

describe("App Tests", () => {
    it("can get an access token", async () => {
        const res = await agent.post("/v1/parra/auth/token")

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({
            access_token: expect.any(String)
        })
    })
})