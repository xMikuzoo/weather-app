<script lang="ts" setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <Card>
    <CardContent class="overflow-y-auto max-h-[50dvh]">
      <Table>
        <TableCaption>Ładowanie danych pogodowych...</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Godzina</TableHead>
            <TableHead>Temperatura</TableHead>
            <TableHead>Warunki</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in 12" :key="row">
            <TableCell>
              <Skeleton class="h-4 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton class="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton class="h-4 w-12" />
            </TableCell>
            <TableCell>
              <Skeleton class="h-4 w-24" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
