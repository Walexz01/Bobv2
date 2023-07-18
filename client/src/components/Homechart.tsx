import {
  Box,
  Heading,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Monday",
    ordered: 4000,
    canceled: 2400,
    pending: 2400,
  },
  {
    name: "Tuesday",
    ordered: 3000,
    canceled: 1398,
    pending: 2210,
  },
  {
    name: "Wednesday",
    ordered: 2000,
    canceled: 9800,
    pending: 2290,
  },
  {
    name: "Thursday",
    ordered: 2780,
    canceled: 3908,
    pending: 2000,
  },
  {
    name: "Friday",
    ordered: 1890,
    canceled: 4800,
    pending: 2181,
  },
  {
    name: "Saturday",
    ordered: 2390,
    canceled: 3800,
    pending: 2500,
  },
  {
    name: "Sunday",
    ordered: 3490,
    canceled: 4300,
    pending: 2100,
  },
];

export default function Homechart() {
  const bg = useColorModeValue("white", "#252944");
  const border = useColorModeValue("gray", "white");
  const chartWidth = useBreakpointValue(
    {
      base: 250,
      md: 360,
      xl: 500,
    },
    {
      fallback: "md",
    }
  );

  return (
    <Box
      bgColor={bg}
      p={"20px"}
      borderRadius={"1rem"}
      borderColor={border}
      border={"1px solid gray"}
    >
      <Heading size={"sm"} fontSize={"1.2rem"} pb={"20px"}>
        Sales Report
      </Heading>
      <Box marginX={"auto"} display={"flex"} justifyContent={"center"}>
        <AreaChart
          width={chartWidth}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="ordered"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="canceled"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="pending"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </Box>
    </Box>
  );
}
