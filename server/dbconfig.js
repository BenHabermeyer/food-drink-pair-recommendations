// Private. Will not be included in submission
module.exports = {
user : process.env.NODE_ORACLEDB_USER || "PennDrinkers",

password : process.env.NODE_ORACLEDB_PASSWORD || "Quaker2020",

connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=cis550foodwinebeer.cz9cryizahld.us-east-1.rds.amazonaws.com) (PORT=1521))(CONNECT_DATA=(SID=Pairings)))",

externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
